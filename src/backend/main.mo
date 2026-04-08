import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Float "mo:core/Float";
import Map "mo:core/Map";
import Iter "mo:core/Iter";



actor {
  // ============================
  // Simple Admin Management
  // ============================
  let adminMap = Map.empty<Principal, Bool>();
  var firstLogin = true;

  public query ({ caller }) func isCallerAdmin() : async Bool {
    isAdmin(caller)
  };

  public shared ({ caller }) func registerAdmin(user : Principal) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can register other admins");
    };
    adminMap.add(user, true);
  };

  public shared ({ caller }) func initialize() : async () {
    if (firstLogin) {
      firstLogin := false;
      adminMap.add(caller, true);
    };
  };

  private func isAdmin(p : Principal) : Bool {
    if (p.isAnonymous()) return false;
    if (firstLogin) {
      firstLogin := false;
      adminMap.add(p, true);
      return true;
    };
    switch (adminMap.get(p)) {
      case (?true) { true };
      case _ { false };
    };
  };

  // ============================
  // Data Structures
  // ============================
  public type UserProfile = {
    name : Text;
  };

  public type Resume = {
    id : Text;
    userId : Principal;
    fileName : Text;
    jobDesc : Text;
    linkedinUrl : Text;
    overallScore : Nat;
    atsScore : Nat;
    acceptanceRate : Nat;
    competencies : [Text];
    improvements : [Text];
    linkedinTips : [Text];
    highlightSkills : [Text];
    createdAt : Int;
    reportRequested : Bool;
    pdfGenerated : Bool;
  };

  public type JobListing = {
    id : Text;
    title : Text;
    company : Text;
    city : Text;
    jobType : Text;
    salary : Text;
    badge : ?Text;
    area : Text;
    source : Text;
    applyUrl : Text;
    postedAt : Int;
  };

  public type BlogPost = {
    id : Text;
    title : Text;
    summary : Text;
    content : Text;
    author : Text;
    imageUrl : Text;
    tags : [Text];
    published : Bool;
    createdAt : Int;
    updatedAt : Int;
  };

  public type Testimonial = {
    id : Text;
    name : Text;
    profession : Text;
    city : Text;
    text : Text;
    approved : Bool;
    createdAt : Int;
  };

  public type Product = {
    id : Text;
    name : Text;
    description : Text;
    price : Float;
    imageUrl : Text;
    category : Text;
    available : Bool;
    paymentLink : Text;
    createdAt : Int;
  };

  public type JobSource = {
    id : Text;
    name : Text;
    url : Text;
    region : Text;
    active : Bool;
    notes : Text;
    createdAt : Int;
  };

  public type PaymentConfig = {
    mercadoPagoKey : Text;
    paypalClientId : Text;
    pixKey : Text;
    updatedAt : Int;
  };

  // ============================
  // Storage
  // ============================
  let userProfiles = Map.empty<Principal, UserProfile>();
  let resumes = Map.empty<Text, Resume>();
  let jobListings = Map.empty<Text, JobListing>();
  let blogPosts = Map.empty<Text, BlogPost>();
  let testimonials = Map.empty<Text, Testimonial>();
  let products = Map.empty<Text, Product>();
  let jobSources = Map.empty<Text, JobSource>();
  var lastJobUpdateTime : Int = 0;
  var paymentConfig : ?PaymentConfig = null;

  // ============================
  // User Profile Functions
  // ============================
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public query func getUserProfile(user : Principal) : async ?UserProfile {
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    userProfiles.add(caller, profile);
  };

  // ============================
  // Resume Functions
  // ============================
  public shared ({ caller }) func saveResume(resume : Resume) : async () {
    let newResume = { resume with userId = caller };
    resumes.add(resume.id, newResume);
  };

  public query ({ caller }) func getMyResumes() : async [Resume] {
    resumes.values().toArray().filter(func(r) { r.userId == caller });
  };

  public shared ({ caller }) func requestReport(resumeId : Text) : async () {
    switch (resumes.get(resumeId)) {
      case (null) { Runtime.trap("Resume not found") };
      case (?resume) {
        if (resume.userId != caller and not isAdmin(caller)) {
          Runtime.trap("Unauthorized: You can only request reports for your own resumes");
        };
        let updatedResume = { resume with reportRequested = true : Bool };
        resumes.add(resumeId, updatedResume);
      };
    };
  };

  public query ({ caller }) func getAllResumes() : async [Resume] {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can view all resumes");
    };
    resumes.values().toArray();
  };

  public shared ({ caller }) func updateResumeReportStatus(resumeId : Text, pdfGenerated : Bool) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can update report status");
    };
    switch (resumes.get(resumeId)) {
      case (null) { Runtime.trap("Resume not found") };
      case (?resume) {
        let updatedResume = { resume with pdfGenerated };
        resumes.add(resumeId, updatedResume);
      };
    };
  };

  // ============================
  // Job Listing Functions
  // ============================
  public query func getVagas() : async [JobListing] {
    let now = Time.now();
    jobListings.values().toArray().filter(
      func(j) { j.postedAt > 0 and (now - j.postedAt <= 10 * 24 * 60 * 60 * 1_000_000_000) },
    );
  };

  public shared ({ caller }) func addVaga(job : JobListing) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can add job listings");
    };
    let newJob = { job with postedAt = Time.now() };
    jobListings.add(job.id, newJob);
  };

  public shared ({ caller }) func deleteExpiredVagas() : async Nat {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can delete expired job listings");
    };
    let now = Time.now();
    let expired = jobListings.filter(
      func(_id, j) { j.postedAt > 0 and (now - j.postedAt > 10 * 24 * 60 * 60 * 1_000_000_000) }
    );
    let count = expired.size();
    for ((id, _) in expired.entries()) { jobListings.remove(id) };
    count;
  };

  public shared ({ caller }) func triggerWeeklyUpdate() : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can trigger updates");
    };
    let _ = await deleteExpiredVagas();
    lastJobUpdateTime := Time.now();
  };

  public query func getLastUpdateTime() : async Int {
    lastJobUpdateTime;
  };

  // ============================
  // Blog Post Functions
  // ============================
  public shared ({ caller }) func addBlogPost(post : BlogPost) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can add blog posts");
    };
    let newPost = { post with createdAt = Time.now(); updatedAt = Time.now() };
    blogPosts.add(post.id, newPost);
  };

  public shared ({ caller }) func updateBlogPost(post : BlogPost) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can update blog posts");
    };
    let updatedPost = { post with updatedAt = Time.now() };
    blogPosts.add(post.id, updatedPost);
  };

  public shared ({ caller }) func deleteBlogPost(id : Text) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can delete blog posts");
    };
    blogPosts.remove(id);
  };

  public query ({ caller }) func getAllBlogPosts() : async [BlogPost] {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can view all blog posts");
    };
    blogPosts.values().toArray();
  };

  public query func getBlogPosts() : async [BlogPost] {
    blogPosts.values().toArray().filter(func(post) { post.published });
  };

  public query func getBlogPost(id : Text) : async ?BlogPost {
    blogPosts.get(id);
  };

  // ============================
  // Testimonial Functions
  // ============================
  public shared ({ caller }) func submitTestimonial(testimonial : Testimonial) : async () {
    let _ = caller;
    let newTestimonial = { testimonial with approved = false };
    testimonials.add(testimonial.id, newTestimonial);
  };

  public shared ({ caller }) func approveTestimonial(id : Text) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can approve testimonials");
    };
    switch (testimonials.get(id)) {
      case (null) { Runtime.trap("Testimonial not found") };
      case (?testimonial) {
        testimonials.add(id, { testimonial with approved = true });
      };
    };
  };

  public shared ({ caller }) func deleteTestimonial(id : Text) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can delete testimonials");
    };
    testimonials.remove(id);
  };

  public query func getApprovedTestimonials() : async [Testimonial] {
    testimonials.values().toArray().filter(func(t) { t.approved });
  };

  public query ({ caller }) func getAllTestimonials() : async [Testimonial] {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can view all testimonials");
    };
    testimonials.values().toArray();
  };

  // ============================
  // Product Functions
  // ============================
  public shared ({ caller }) func addProduct(product : Product) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    let newProduct = { product with createdAt = Time.now() };
    products.add(product.id, newProduct);
  };

  public shared ({ caller }) func updateProduct(product : Product) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    products.add(product.id, product);
  };

  public shared ({ caller }) func deleteProduct(id : Text) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    products.remove(id);
  };

  public query func getProducts() : async [Product] {
    products.values().toArray().filter(func(p) { p.available });
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can view all products");
    };
    products.values().toArray();
  };

  // ============================
  // Job Source Functions
  // ============================
  public shared ({ caller }) func addJobSource(source : JobSource) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can add job sources");
    };
    let newSource = { source with createdAt = Time.now() };
    jobSources.add(source.id, newSource);
  };

  public shared ({ caller }) func updateJobSource(source : JobSource) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can update job sources");
    };
    jobSources.add(source.id, source);
  };

  public shared ({ caller }) func deleteJobSource(id : Text) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can delete job sources");
    };
    jobSources.remove(id);
  };

  public query ({ caller }) func getJobSources() : async [JobSource] {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can view job sources");
    };
    jobSources.values().toArray();
  };

  public query ({ caller }) func getActiveJobSources() : async [JobSource] {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can view job sources");
    };
    jobSources.values().toArray().filter(func(s) { s.active });
  };

  // ============================
  // Payment Config Functions
  // ============================
  public shared ({ caller }) func savePaymentConfig(config : PaymentConfig) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can save payment config");
    };
    paymentConfig := ?{ config with updatedAt = Time.now() };
  };

  public query ({ caller }) func getPaymentConfig() : async ?PaymentConfig {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can view payment config");
    };
    paymentConfig;
  };
};
