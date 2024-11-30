"use client";

import { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { XIcon } from "lucide-react";
import axios from "axios";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  fullName: Yup.string().required("Required"),
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
  phoneNumber: Yup.string().required("Required"),
  address: Yup.string(),
  dateOfBirth: Yup.date(),
  highestQualification: Yup.string(),
  yearsOfExperience: Yup.number().min(0, "Must be at least 0"),
  preferredJobRole: Yup.string(),
  linkedInProfile: Yup.string().url("Must be a valid URL"),
  gitHubProfile: Yup.string().url("Must be a valid URL"),
  skills: Yup.array().of(Yup.string()),
  availability: Yup.string().oneOf(["Full-time", "Part-time", "Freelance"]),
  relocationPreferences: Yup.string(),
  portfolioURL: Yup.string().url("Must be a valid URL"),
});

const registerUser = async (values) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/register`,
      values
    );
    if (data) {
      alert("Registered successfully");
      setSubmissionMessage("Registration successful!");
    }
  } catch (error) {
    setSubmissionMessage(
      `Registration failed: ${error.response?.data?.message || error.message}`
    );
  }
};

export default function RegisterPage() {
  const [newSkill, setNewSkill] = useState("");

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Registration</CardTitle>
          <CardDescription>
            Please fill out the form below to register.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              email: "",
              fullName: "",
              password: "",
              phoneNumber: "",
              address: "",
              dateOfBirth: "",
              highestQualification: "",
              yearsOfExperience: 0,
              preferredJobRole: "",
              linkedInProfile: "",
              gitHubProfile: "",
              resume: null,
              skills: [],
              availability: "Full-time",
              relocationPreferences: "",
              portfolioURL: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              await registerUser(values);
              setSubmitting(false);
              resetForm();
            }}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Field name="email" as={Input} />
                  {errors.email && touched.email && (
                    <div className="text-red-500">{errors.email}</div>
                  )}
                </div>

                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Field name="fullName" as={Input} />
                  {errors.fullName && touched.fullName && (
                    <div className="text-red-500">{errors.fullName}</div>
                  )}
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Field name="password" type="password" as={Input} />
                  {errors.password && touched.password && (
                    <div className="text-red-500">{errors.password}</div>
                  )}
                </div>

                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Field name="phoneNumber" as={Input} />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <div className="text-red-500">{errors.phoneNumber}</div>
                  )}
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Field name="address" as={Input} />
                </div>

                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Field name="dateOfBirth" type="date" as={Input} />
                </div>

                <div>
                  <Label htmlFor="highestQualification">
                    Highest Qualification
                  </Label>
                  <Field name="highestQualification" as={Input} />
                </div>

                <div>
                  <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                  <Field name="yearsOfExperience" type="number" as={Input} />
                </div>

                <div>
                  <Label htmlFor="preferredJobRole">Preferred Job Role</Label>
                  <Field name="preferredJobRole" as={Input} />
                </div>

                <div>
                  <Label htmlFor="linkedInProfile">LinkedIn Profile</Label>
                  <Field name="linkedInProfile" as={Input} />
                </div>

                <div>
                  <Label htmlFor="gitHubProfile">GitHub Profile</Label>
                  <Field name="gitHubProfile" as={Input} />
                </div>

                <div>
                  <Label htmlFor="resume">Resume</Label>
                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    onChange={(event) => {
                      setFieldValue("resume", event.currentTarget.files[0]);
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="skills">Skills</Label>
                  <FieldArray name="skills">
                    {({ push, remove }) => (
                      <div>
                        <div className="flex space-x-2">
                          <Input
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Add a skill"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                if (newSkill) {
                                  push(newSkill);
                                  setNewSkill("");
                                }
                              }
                            }}
                          />
                          <Button
                            type="button"
                            onClick={() => {
                              if (newSkill) {
                                push(newSkill);
                                setNewSkill("");
                              }
                            }}
                          >
                            Add
                          </Button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Field name="skills">
                            {({ field }) =>
                              field.value.map((skill, index) => (
                                <span
                                  key={index}
                                  className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm flex items-center"
                                >
                                  {skill}
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="ml-2 text-primary-foreground hover:text-red-500"
                                  >
                                    <XIcon size={14} />
                                  </button>
                                </span>
                              ))
                            }
                          </Field>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </div>

                <div>
                  <Label htmlFor="availability">Availability</Label>
                  <Field name="availability">
                    {({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Freelance">Freelance</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                </div>

                <div>
                  <Label htmlFor="relocationPreferences">
                    Relocation Preferences
                  </Label>
                  <Field name="relocationPreferences" as={Input} />
                </div>

                <div>
                  <Label htmlFor="portfolioURL">Portfolio URL</Label>
                  <Field name="portfolioURL" as={Input} />
                </div>

                <Button type="submit">Register</Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
