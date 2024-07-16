import { Meta } from "@storybook/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/ui/form";

import { Input } from "./input";

export default {
  title: "UI/Form",
  component: Form,
  argTypes: {},
} as Meta;

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

interface ProfileFormValues {
  username: string;
}

const onSubmit: SubmitHandler<ProfileFormValues> = (values) => {
  console.log(values);
};

export const ProfileForm = () => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Form>
  );
};
