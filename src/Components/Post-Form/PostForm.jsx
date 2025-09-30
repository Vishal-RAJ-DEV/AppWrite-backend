import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import services from '../../appwrite/Services'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const PostForm = ({ post }) => {
    const { register, handleSubmit, watch, setValue, getValues, control } = useForm(
        {
            defaultValues: {
                title: post ? post.title || '' : '',
                slug: post ? post.slug || '' : '',
                content: post ? post.content || '' : '',
                status: post ? post.status || 'active' : '',
            },
        }
    )

    const navigate = useNavigate();
    const userdata = useSelector((state) => state.auth?.userData);

    const submit = async (data) => {
        if (post) {
            data.image[0] ? services.uploadFile(data.image[0]) : null

            if (data.image[0]) { // delete the previous featured image
                services.deleteFile(post.featuredImage)
            }

            const updatedpost = await services.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.Id : undefined,
            })
            if (updatedpost) {
                navigate(`/posts/${post.$id}`)
            }
        } else {
            // Check if userdata exists before proceeding
            if (!userdata) {
                console.error("User data is missing. Please log in again.");
                // You might want to redirect to login page or show an error message
                navigate("/login");
                return;
            }
            
            const file = await services.uploadFile(data.image[0])

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await services.createPost({
                    ...data,
                    userId: userdata.$id
                });
                if (dbPost) navigate(`/posts/${dbPost.$id}`);
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
        } return '';
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }))   //here slug is set as the transformed title
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, setValue, slugTransform]);

    return (
        <div className="w-full max-w-3xl mx-auto py-8">
            <form onSubmit={handleSubmit(submit)} className="space-y-6">
                {/* Title Input */}
                <div className='w-2/3 px-3 '>

                    <Input
                        label="Title"
                        placeholder="Enter post title"
                        className="mb-4"
                        {...register("title", { required: true })}
                    />

                    {/* Slug Input */}
                    <Input
                        label="Slug"
                        placeholder="url-friendly-slug"
                        className="mb-4"
                        {...register("slug", { required: true })}
                        readOnly
                        onInput={(e) =>
                            setValue('slug', slugTransform(e.target.value, { shouldValidate: true }))
                        }
                    />
                    <RTE
                        label="Content"
                        name="content"
                        control={control}
                        defaultValue={getValues("content")}
                    />
                </div>
                {/* Featured Image Input */}

                <div className='w-1/3 px-2'>

                    <Input
                        label="Featured Image"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={services.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}

                    <Select
                        options={[
                            { label: "Active", value: "active" },
                            { label: "Draft", value: "draft" }
                        ]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
                    />

                    {/* Submit Button */}
                    <Button
                        types="submit"
                        bgColor={post ? "bg-green-500" : "bg-blue-500"}
                        className="w-full"
                    >
                        {post ? "Update" : "Create"} Post
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default PostForm