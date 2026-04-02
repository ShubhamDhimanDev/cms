import { Head, router, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { withAdminLayout } from '@/pages/Admin/AdminLayout';
import * as categoryRoutes from '@/routes/admin/categories';
import type { Category } from '@/types/cms';

type Props = {
    categories: Category[];
};

type CategoryFormData = {
    name: string;
    slug: string;
    description: string;
};

export default function CategoriesIndex({ categories }: Props) {
    const createForm = useForm<CategoryFormData>({
        name: '',
        slug: '',
        description: '',
    });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingData, setEditingData] = useState<CategoryFormData>({
        name: '',
        slug: '',
        description: '',
    });

    const startEditing = (category: Category) => {
        setEditingId(category.id);
        setEditingData({
            name: category.name,
            slug: category.slug,
            description: category.description ?? '',
        });
    };

    const submitCreate = (event: FormEvent) => {
        event.preventDefault();

        createForm.post(categoryRoutes.store.url(), {
            preserveScroll: true,
            onSuccess: () => createForm.reset(),
        });
    };

    const submitUpdate = (event: FormEvent, categoryId: number) => {
        event.preventDefault();

        router.patch(categoryRoutes.update.url({ category: categoryId }), editingData, {
            preserveScroll: true,
            onSuccess: () => setEditingId(null),
        });
    };

    const deleteCategory = (category: Category) => {
        if (!window.confirm(`Delete category "${category.name}"?`)) {
            return;
        }

        router.delete(categoryRoutes.destroy.url({ category: category.id }), {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Categories" />

            <div className="space-y-4">
                <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>

                <form
                    onSubmit={submitCreate}
                    className="grid gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm md:grid-cols-3"
                >
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={createForm.data.name}
                            onChange={(event) => createForm.setData('name', event.target.value)}
                        />
                        <InputError message={createForm.errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            value={createForm.data.slug}
                            onChange={(event) => createForm.setData('slug', event.target.value)}
                        />
                        <InputError message={createForm.errors.slug} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            value={createForm.data.description}
                            onChange={(event) => createForm.setData('description', event.target.value)}
                        />
                        <InputError message={createForm.errors.description} />
                    </div>

                    <div className="md:col-span-3">
                        <Button type="submit" disabled={createForm.processing}>
                            Save Category
                        </Button>
                    </div>
                </form>

                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                    <table className="w-full divide-y divide-neutral-200 text-sm">
                        <thead className="bg-neutral-50">
                            <tr className="text-left text-neutral-600">
                                <th className="px-4 py-3 font-medium">Name</th>
                                <th className="px-4 py-3 font-medium">Slug</th>
                                <th className="px-4 py-3 font-medium">Description</th>
                                <th className="px-4 py-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {categories.map((category) => {
                                const isEditing = editingId === category.id;

                                return (
                                    <tr key={category.id}>
                                        <td className="px-4 py-3">
                                            {isEditing ? (
                                                <Input
                                                    value={editingData.name}
                                                    onChange={(event) =>
                                                        setEditingData((prev) => ({ ...prev, name: event.target.value }))
                                                    }
                                                />
                                            ) : (
                                                category.name
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            {isEditing ? (
                                                <Input
                                                    value={editingData.slug}
                                                    onChange={(event) =>
                                                        setEditingData((prev) => ({ ...prev, slug: event.target.value }))
                                                    }
                                                />
                                            ) : (
                                                category.slug
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            {isEditing ? (
                                                <Input
                                                    value={editingData.description}
                                                    onChange={(event) =>
                                                        setEditingData((prev) => ({ ...prev, description: event.target.value }))
                                                    }
                                                />
                                            ) : (
                                                category.description ?? '-'
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            {isEditing ? (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={(event) => submitUpdate(event, category.id)}
                                                        className="text-sm font-medium text-neutral-700 underline-offset-4 hover:underline"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditingId(null)}
                                                        className="text-sm font-medium text-neutral-500 underline-offset-4 hover:underline"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => startEditing(category)}
                                                        className="text-sm font-medium text-neutral-700 underline-offset-4 hover:underline"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => deleteCategory(category)}
                                                        className="text-sm font-medium text-red-600 underline-offset-4 hover:underline"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

CategoriesIndex.layout = withAdminLayout;
