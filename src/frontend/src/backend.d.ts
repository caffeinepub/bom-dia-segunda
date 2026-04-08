import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface JobSource {
    id: string;
    url: string;
    region: string;
    active: boolean;
    name: string;
    createdAt: bigint;
    notes: string;
}
export interface UserProfile {
    name: string;
}
export interface Testimonial {
    id: string;
    city: string;
    name: string;
    createdAt: bigint;
    text: string;
    profession: string;
    approved: boolean;
}
export interface BlogPost {
    id: string;
    title: string;
    content: string;
    published: boolean;
    createdAt: bigint;
    tags: Array<string>;
    author: string;
    summary: string;
    updatedAt: bigint;
    imageUrl: string;
}
export interface JobListing {
    id: string;
    title: string;
    postedAt: bigint;
    salary: string;
    applyUrl: string;
    source: string;
    jobType: string;
    area: string;
    city: string;
    company: string;
    badge?: string;
}
export interface Resume {
    id: string;
    overallScore: bigint;
    jobDesc: string;
    acceptanceRate: bigint;
    userId: Principal;
    improvements: Array<string>;
    createdAt: bigint;
    fileName: string;
    highlightSkills: Array<string>;
    reportRequested: boolean;
    atsScore: bigint;
    linkedinTips: Array<string>;
    competencies: Array<string>;
    linkedinUrl: string;
    pdfGenerated: boolean;
}
export interface Product {
    id: string;
    name: string;
    createdAt: bigint;
    description: string;
    available: boolean;
    imageUrl: string;
    paymentLink: string;
    category: string;
    price: number;
}
export interface PaymentConfig {
    updatedAt: bigint;
    pixKey: string;
    paypalClientId: string;
    mercadoPagoKey: string;
}
export interface backendInterface {
    addBlogPost(post: BlogPost): Promise<void>;
    addJobSource(source: JobSource): Promise<void>;
    addProduct(product: Product): Promise<void>;
    addVaga(job: JobListing): Promise<void>;
    approveTestimonial(id: string): Promise<void>;
    deleteBlogPost(id: string): Promise<void>;
    deleteExpiredVagas(): Promise<bigint>;
    deleteJobSource(id: string): Promise<void>;
    deleteProduct(id: string): Promise<void>;
    deleteTestimonial(id: string): Promise<void>;
    getActiveJobSources(): Promise<Array<JobSource>>;
    getAllBlogPosts(): Promise<Array<BlogPost>>;
    getAllProducts(): Promise<Array<Product>>;
    getAllResumes(): Promise<Array<Resume>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getApprovedTestimonials(): Promise<Array<Testimonial>>;
    getBlogPost(id: string): Promise<BlogPost | null>;
    getBlogPosts(): Promise<Array<BlogPost>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getJobSources(): Promise<Array<JobSource>>;
    getLastUpdateTime(): Promise<bigint>;
    getMyResumes(): Promise<Array<Resume>>;
    getPaymentConfig(): Promise<PaymentConfig | null>;
    getProducts(): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getVagas(): Promise<Array<JobListing>>;
    initialize(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    registerAdmin(user: Principal): Promise<void>;
    requestReport(resumeId: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    savePaymentConfig(config: PaymentConfig): Promise<void>;
    saveResume(resume: Resume): Promise<void>;
    submitTestimonial(testimonial: Testimonial): Promise<void>;
    triggerWeeklyUpdate(): Promise<void>;
    updateBlogPost(post: BlogPost): Promise<void>;
    updateJobSource(source: JobSource): Promise<void>;
    updateProduct(product: Product): Promise<void>;
    updateResumeReportStatus(resumeId: string, pdfGenerated: boolean): Promise<void>;
}
