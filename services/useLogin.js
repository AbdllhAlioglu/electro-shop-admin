import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "./apiAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export function useLogin() {
  const router = useRouter();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      toast.success("Başarıyla giriş yapıldı!");
      router.push("/dashboard");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message || "Email veya şifre hatalı!");
    },
  });

  return { login, isLoading };
}
