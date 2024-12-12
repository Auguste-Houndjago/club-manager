"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import Link from "next/link";
import { Input } from "../ui/input";
import { FormInput } from "./form-input";


const formSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirm_password: z.string(),
  profile_photo: z.any().optional(),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(values);
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="backdrop-blur-sm bg-white/50 dark:bg-black/20 p-6 rounded-lg shadow-lg"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              form={form}
              name="first_name"
              label="First Name"
              placeholder="John"
            />
            <FormInput
              form={form}
              name="last_name"
              label="Last Name"
              placeholder="Doe"
            />
          </div>

          <FormInput
            form={form}
            name="email"
            label="Email"
            type="email"
            placeholder="john.doe@example.com"
          />

          <FormInput
            form={form}
            name="password"
            label="Password"
            type="password"
            placeholder="********"
          />

          <FormInput
            form={form}
            name="confirm_password"
            label="Confirm Password"
            type="password"
            placeholder="********"
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">Profile Photo</label>
            <div className="flex items-center gap-4">
              {previewUrl ? (
                <div className="relative w-20 h-20">
                  <img
                    src={previewUrl}
                    alt="Profile preview"
                    className="rounded-full object-cover w-full h-full ring-2 ring-primary/20"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  form.setValue("profile_photo", e.target.files?.[0]);
                  handleImageChange(e);
                }}
                className="flex-1"
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-11" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>
        </form>
      </Form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link 
          href="/auth/signin" 
          className="font-medium text-primary hover:underline"
        >
          Sign In
        </Link>
      </p>
    </motion.div>
  );
}