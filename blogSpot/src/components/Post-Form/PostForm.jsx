import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import service from "../../Appwrite/Service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.Title || "",
            slug: post?.$id || "",
            content: post?.Content || "",
            status: post?.Status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    // This is a new, dedicated function to handle all image logic.
    // It uploads a new image, deletes the old one, and returns the final public URL.
    const handleImageProcessing = async (newImageFile, existingImageUrl) => {
        try {
            // If no new image was provided, we don't need to do anything.
            if (!newImageFile || newImageFile.length === 0) {
                return existingImageUrl;
            }

            // A new image was provided. First, if an old image exists, delete it.
            if (existingImageUrl) {
                const oldFileId = existingImageUrl.split('/files/')[1].split('/view')[0];
                await service.DeleteFile(oldFileId);
            }

            // Now, upload the new image.
            const uploadedFile = await service.UploadFile(newImageFile[0]);
            if (uploadedFile) {
                // If the upload is successful, return its public URL.
                return service.FilePreview(uploadedFile.$id);
            }
        } catch (error) {
            console.error("Error processing image:", error);
        }
        // If anything fails, fall back to the old URL or null.
        return existingImageUrl;
    };

    const submit = async (data) => {
        try {
            // --- Step 1: Process the image and get the final URL ---
            const finalImageUrl = await handleImageProcessing(data.image, post?.FeatureImg);

            // --- Step 2: Prepare the post data with the final URL ---
            const postData = {
                title: data.title,
                content: data.content,
                FeatureImg: finalImageUrl,
                status: data.status,
            };

            // --- Step 3: Create or Update the post in the database ---
            let dbPost;
            if (post) {
                // This is an UPDATE operation.
                dbPost = await service.UpdateDoc(post.$id, postData);
            } else {
                // This is a CREATE operation. An image is required.
                if (!finalImageUrl) {
                    console.error("An image is required to create a new post.");
                    return; 
                }
                dbPost = await service.CreateDoc({
                    ...postData,
                    slug: data.slug,
                    userId: userData.$id,
                });
            }

            // --- Step 4: Navigate to the post page ---
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } catch (error) {
            console.error("A problem occurred during form submission:", error);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-");
        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={post.FeatureImg}
                            alt={post.Title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
