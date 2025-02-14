"use client";
import React, { useState } from "react";
import google from "../assets/google.svg";
import githubicon from "../assets/github.svg";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
const formSchema = z.object({
  role: z.enum(["guard", "police", "society_owner", "field_visitor"]),
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  age: z.union([z.string(), z.number()]).refine((val) => {
    const age = Number(val);
    return !isNaN(age) && age > 18 && age < 100;
  }, "Age must be between 18 and 100"),
  phone: z.string().regex(/^\d{10}$/, "Invalid phone number format"),
  aadhar: z.string().regex(/^\d{12}$/, "Invalid Aadhar number format"),
  society: z.string().optional(),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .optional(),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/admin",
    });

    if (res?.error) {
      setError("Invalid username or password");
    } else if (res?.url) {
      router.push(res.url);
    }
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (data: any) => {
    console.log("Form submitted", data);
  };
  return (
    <div className="flex justify-center">
      <Tabs defaultValue="signin">
        <TabsList className="flex space-x-4">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="font-bold text-1xl text-red-500">{error}</div>
              )}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="p-2 border border-gray-300 rounded-lg text-black"
                      >
                        <option value="guard">Guard</option>
                        <option value="police">Police</option>
                        <option value="society_owner">Society Owner</option>
                        <option value="field_visitor">Field Visitor</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Age" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Phone Number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aadhar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aadhar Number</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Aadhar Number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="society"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Society (if applicable)</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Society Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Register</Button>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="login">
          <div className="flex flex-col items-center justify-center w-full  bg-gray-50 px-4">
            <div className="bg-white p-8 shadow-md rounded-xl w-full max-w-md">
              <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
                Welcome Back
              </h1>
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="text-red-500 text-sm font-medium text-center">
                    {error}
                  </div>
                )}
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-gray-700 text-sm mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="password"
                    className="text-gray-700 text-sm mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white font-medium py-3 rounded-lg hover:bg-gray-700 transition"
                >
                  Sign In
                </button>
              </form>
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => signIn("google", { callbackUrl: "/admin" })}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 rounded-lg shadow-sm hover:bg-gray-100 transition"
                >
                  <img src={google.src} alt="Google" className="w-5 h-5" />
                  <span className="text-gray-700 font-medium">
                    Sign in with Google
                  </span>
                </button>
                <button
                  onClick={() => signIn("github", { callbackUrl: "/admin" })}
                  className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-3 rounded-lg shadow-sm hover:bg-gray-700 transition"
                >
                  <img src={githubicon.src} alt="GitHub" className="w-5 h-5" />
                  <span className="font-medium">Sign in with GitHub</span>
                </button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SignIn;
