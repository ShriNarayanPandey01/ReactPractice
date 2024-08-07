import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import service from "../../Appwrite/Service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        console.log("Form data:", data); // Log form data

        try {
            if (post) {
                const file = data.image[0] ? await service.UploadFile(data.image[0]) : null;
                console.log("File upload result:1 ", file); // Log file upload result

                if (file) {
                    await service.DeleteFile(post.featuredImage);
                }

                const dbPost = await service.UpdateDoc(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });
                console.log("Updated document:", dbPost); // Log updated document result

                // if (dbPost) {
                //     navigate(`/post/${dbPost.$id}`);
                // }
            } else {
                const file = await service.UploadFile(data.image[0]);
                console.log("File upload result: 2", file); // Log file upload result

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    console.log(data)
                    const dbPost = await service.CreateDoc({ ...data});
                    console.log("Created document:", dbPost); // Log created document result

                    // if (dbPost) {
                    //     navigate(`/post/${dbPost.$id}`);
                    // }
                }
            }
        } catch (error) {
            console.error("Error during form submission:", error); // Log error
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
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
                {errors.title && <p className="text-red-500">Title is required</p>}
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                {errors.slug && <p className="text-red-500">Slug is required</p>}
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
                {errors.image && <p className="text-red-500">Image is required</p>}
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.FilePreview(post.featuredImage)}
                            alt={post.title}
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
                {errors.status && <p className="text-red-500">Status is required</p>}
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

