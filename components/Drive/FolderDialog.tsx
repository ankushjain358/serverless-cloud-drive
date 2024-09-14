"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from 'aws-amplify/auth';
import { toast } from "react-hot-toast"

type Folder = Schema['Folder']['type'];
const client = generateClient<Schema>()

// form schema
const formSchema = z.object({
  parentFolderId: z.string().min(1),
  folderName: z.string().trim().min(1, "Folder name is required").max(50, "Folder name must be 50 characters or less"),
});

// Component props
type FolderDialogProps = {
  currentFolderId: string;
  isOpen: boolean;
  onClose: () => void;
};

// Component definition
const FolderDialog = ({ currentFolderId, isOpen, onClose }: FolderDialogProps) => {

  console.log("FolderDialog rendered")

  // Form to add new folder
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentFolderId: currentFolderId,
      folderName: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    const { userId } = await getCurrentUser();

    const { data, errors } = await client.models.Folder.create({
      userId: userId,
      parentFolderId: values.parentFolderId,
      folderName: values.folderName
    }, {
      authMode: 'userPool'
    })

    if (errors) {
      toast.error("Failed to add folder");
      console.error(errors);
      return;
    }

    toast.success("Folder added successfully");
    onClose();
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogDescription>
            Enter the name of the folder you want to create.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="folderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Folder Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FolderDialog;
