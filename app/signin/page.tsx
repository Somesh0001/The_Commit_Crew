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
import { ToastContainer, toast } from 'react-toastify';
import {
  Form,
  FormControl,
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
  approved: z.boolean().default(false),
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
      callbackUrl: "/profile",
    });
    if (res?.error) {
      console.log("Error : ", res.error);
      setError(res.error);
      setTimeout(() => {
        setError(null);
      }, 5000);
    } else if (res?.url) {
      router.push(res.url);
    }
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "guard",
      approved: false,
    },
  });
  const onSubmit = async (data: any) => {
    console.log("Form submitted", data);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      toast("User Registered Successfully");
      const result = await response.json();
      if (response.ok) {
        console.log("User Registered:", result);
        toast("User Registered Successfully");
      } else {
        console.error("Registration Error:", result);
        toast("Registration Error: " + result.error);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast("Registration Error: " + error);
    }
  };
  const role = form.watch("role");
  return (
    <div className="flex justify-center m-8 p-4 rounded-lg shadow-md">
      <Tabs defaultValue="signin">
        <TabsList className="flex justify-center space-x-4 mb-4">
          <TabsTrigger
            value="signin"
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger
            value="login"
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Login
          </TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              {error && (
                <div className="text-red-500 font-bold text-lg text-center">
                  {error}
                </div>
              )}
              {/* Inline field: Role */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <FormLabel className="w-32">Role</FormLabel>
                    <FormControl className="flex-1">
                      <select
                        {...field}
                        className="p-2 border border-gray-300 rounded w-full text-black"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Inline field: Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className="w-32">Name</FormLabel>
                      <FormControl className="flex-1">
                        <Input placeholder="Full Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Inline field: Age */}
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className="w-32">Age</FormLabel>
                      <FormControl className="flex-1">
                        <Input type="number" placeholder="Age" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Inline field: Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className="w-32">Email</FormLabel>
                      <FormControl className="flex-1">
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Inline field: Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className="w-32">Password</FormLabel>
                      <FormControl className="flex-1">
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
                {/* Inline field: Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className="w-32">Phone</FormLabel>
                      <FormControl className="flex-1">
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
                {/* Inline field: Aadhar */}
                <FormField
                  control={form.control}
                  name="aadhar"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className="w-32">Aadhar</FormLabel>
                      <FormControl className="flex-1">
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
              </div>
              {/* Inline field: Society */}
              <FormField
                control={form.control}
                name="society"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <FormLabel className="w-32">Society</FormLabel>
                    <FormControl className="flex-1">
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
              {/* Inline field: Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <FormLabel className="w-32">Address</FormLabel>
                    <FormControl className="flex-1">
                      <Input type="text" placeholder="Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-sm text-gray-600">
                {role === "society_owner" && (
                  <p>
                    Your registration needs to be approved by a police officer.
                  </p>
                )}
                {role === "guard" && (
                  <p>
                    Your registration needs to be approved by a police officer.
                  </p>
                )}
                {role === "field_visitor" && (
                  <p>
                    Your registration needs to be approved by a society owner.
                  </p>
                )}
              </div>
              <Button type="submit">Register</Button>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="login">
          <div className="flex flex-col items-center justify-center w-full bg-gray-50 p-4">
            <div className="bg-white p-8 shadow-md rounded-xl max-w-md w-full">
              {/* Dashboard heading now using Hero's heading styles */}
              <h1 className="hero-text1 thq-heading-1 text-center mb-6">
                Welcome Back
              </h1>
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="text-red-500 text-center font-medium">
                    {error}
                  </div>
                )}
                {/* Inline login field: Email */}
                <div className="flex items-center gap-4">
                  <label htmlFor="email" className="w-32 text-gray-700 text-sm">
                    Email
                  </label>
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
                    required
                  />
                </div>
                {/* Inline login field: Password */}
                <div className="flex items-center gap-4">
                  <label htmlFor="password" className="w-32 text-gray-700 text-sm">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
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
                  onClick={async () => {
                    const res = await signIn("google", {
                      callbackUrl: "/admin",
                    });
                    console.log("Google Login Response:", res);
                  }}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 rounded-lg shadow-sm hover:bg-gray-100 transition"
                >
                  <img src={google.src} alt="Google" className="w-5 h-5" />
                  <span className="text-gray-700 font-medium">
                    Sign in with Google
                  </span>
                </button>
                <button
                  onClick={async () => {
                    const res = await signIn("github", {
                      callbackUrl: "/admin",
                    });
                    console.log("GitHub Login Response:", res);
                  }}
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
