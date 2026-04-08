import { type Backend, createActor } from "@/backend";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMemo } from "react";

const CANISTER_ID: string =
  ((import.meta as unknown as { env: Record<string, string> }).env
    ?.VITE_CANISTER_ID_BACKEND as string | undefined) ?? "aaaaa-aa";

// Extended actor type — backend interface is empty but these methods are called
// frontend-side (they either no-op gracefully or are expected to exist on deploy)
// biome-ignore lint/suspicious/noExplicitAny: actor methods are dynamically typed
type ActorWithMethods = Backend &
  Record<string, (...args: any[]) => Promise<any>>;

export function useActor(): {
  actor: ActorWithMethods | null;
  isFetching: boolean;
} {
  const { identity, loginStatus } = useInternetIdentity();
  const isFetching = loginStatus === "logging-in";

  const actor = useMemo(() => {
    try {
      const base = createActor(
        CANISTER_ID,
        async (blob) => {
          const bytes = await blob.getBytes();
          return bytes as Uint8Array<ArrayBuffer>;
        },
        async (bytes: Uint8Array<ArrayBufferLike>) => {
          const { ExternalBlob } = await import("@/backend");
          return ExternalBlob.fromBytes(bytes as Uint8Array<ArrayBuffer>);
        },
        {
          agentOptions: {
            identity: identity ?? undefined,
            host: window.location.origin,
          },
        },
      );
      return base as ActorWithMethods;
    } catch {
      return null;
    }
  }, [identity]);

  return { actor, isFetching };
}
