"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { toast } from "react-hot-toast"
import Modal from "@/components/layout/Modal";
import Image from "next/image";
import Input from "@/components/inputs/Input";
import BotonSubmit from "@/components/buttons/BotonSubmit";
import Boton from "@/components/buttons/Boton";
import Tag from "@/components/buttons/Tag";

export default function ConfigUserForm() {

    const { data: session, update } = useSession();

    const [showModal, setShowModal] = useState(false);
    const [listaSpices, setListaSpices] = useState([]);
    const [showSpices, setShowSpices] = useState(false);

    const [formData, setFormData] = useState({
        nombre_real: session?.user.nombre_real || "",
        email: "",
        password: "",
        foto: session?.user.foto,
        descripcion_perfil: session?.user.descripcion_perfil || "",
        spices_seguidos: [] as string[],
    });

    useEffect(() => {
        const fetchUsuario = async () => {

            try {
                const response = await fetch(`/api/users/me`);

                if (!response.ok) {
                    throw new Error("Error al recuperar los spices del usuario.");
                }

                const { spices_seguidos } = await response.json();

                if (spices_seguidos === undefined || spices_seguidos === null) {
                    throw new Error("La respuesta no contiene spices_seguidos.");
                }

                setFormData((prevFormData) => ({
                    ...prevFormData,
                    spices_seguidos: spices_seguidos,  // Aquí directamente el array de nombres
                }));
            } catch (err) {
                throw new Error("No se pudo cargar la información del usuario.");
            }
        };

        fetchUsuario();
    }, [session]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData({
                ...formData,
                [name]: checked,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            // En la petición '/api/upload' se gestiona la subida de la imagen a Cloudinary:
            const response = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });

            if (!response.ok) throw new Error("Error al subir la imagen.");

            toast.success("Has cambiado tu imagen de perfil.");

            const data = await response.json();

            // 🔹 Actualizar correctamente el estado global de formData
            setFormData((prev) => ({
                ...prev,
                foto: data.url, // Guardamos la URL devuelta por el backend
            }));
        } catch (error) {
            toast.error("Error al subir la imagen.");
        }
    };

    const handleMostrarSpices = async () => {
        try {
            const response = await fetch(`/api/spices`);
            if (!response.ok) throw new Error("Error al obtener el listado de spices.");

            const spices = await response.json();
            if (!spices) throw new Error("No se han encontrado spices.");

            const nombresSpices = spices.map((spice: { nombre: string }) => spice.nombre);
            setListaSpices(nombresSpices);
            setShowSpices(true);
        } catch (error) {
            throw new Error("Error al obtener el listado de spices.");
        }
    }

    const handleToggleSpice = (spice: string) => {
        setFormData((prevFormData) => {
            const yaExiste = prevFormData.spices_seguidos.includes(spice);
            return {
                ...prevFormData,
                spices_seguidos: yaExiste
                    ? prevFormData.spices_seguidos.filter((s) => s !== spice) // lo quitamos
                    : [...prevFormData.spices_seguidos, spice], // lo añadimos
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (!session?.user.name) {
                toast.error("Error: no se ha encontrado el usuario");
                return;
            }

            const response = await fetch(`/api/users/me`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error("Error al actualizar el perfil.");
            }

            toast.success("Perfil actualizado correctamente");

            await update({
                nombre_real: formData.nombre_real,
                foto: formData.foto,
            });

            window.location.reload();
        } catch (error) {
            toast.error("Error al actualizar el perfil");
        }
    };

    const handleLogout = async () => {
        try {
            await signOut({ callbackUrl: "/" }); // Redirige a la página de inicio tras cerrar sesión
            toast("Has cerrado sesión");
        } catch (error) {
            toast.error("Error al cerrar sesión.");
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await fetch(`/api/users/me`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Error al eliminar tu cuenta.");
            }

            await signOut({ callbackUrl: "/" }); // Redirige a la página de inicio tras eliminar la cuenta
            toast.success("Has eliminado tu cuenta de Spiced permanentemente.");
        } catch (error) {
            toast.error("Error al eliminar tu cuenta.");
        }
    }



    return (

        <div className="w-full mx-auto flex flex-col">

            {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN DE CUENTA: */}

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <div className="flex flex-col gap-4">
                    <h4 className="text-lg font-semibold">¿Seguro que quieres eliminar tu cuenta?</h4>
                    <p className="text-sm text-[var(--gris5)]">
                        Esta acción es permanente y no se puede deshacer. Se eliminarán todos tus datos y no podrás recuperarlos.
                    </p>

                    <div className="flex justify-end gap-4 mt-6">
                        <Boton
                            texto="Cancelar"
                            tamano="pequeno"
                            jerarquia="secundario"
                            onClick={() => setShowModal(false)}
                        />
                        <Boton
                            texto="Sí, eliminar cuenta"
                            tamano="pequeno"
                            jerarquia="primario"
                            onClick={() => {
                                setShowModal(false);
                                handleDeleteAccount();
                            }}
                        />
                    </div>
                </div>
            </Modal>

            {/* SECCIÓN 'EDITA TU PERFIL' */}

            <section className="w-full mx-auto flex flex-col border-b border-b-1 border-b-[var(--gris3)] pb-16 px-col1 gap-12">

                <h3>Edita tu perfil</h3>

                <form onSubmit={handleSubmit} className="w-full flex flex-row gap-8">

                    {/* AVATAR: */}
                    <div className="w-col1">

                        <input
                            type="file"
                            id="foto"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />

                        <label htmlFor="foto" className='opacity-100 cursor-pointer'>
                            <div className="p-1 rounded-full border-[3px] border-[var(--brand1)] hover:scale-[1.02] transition ease">
                                <div className="rounded-full overflow-hidden">
                                    <Image
                                        src={formData.foto || session?.user.foto || "/iconos/iconos-genericos/icono-usuario-anonimo-header.svg"}
                                        width={200}
                                        height={200}
                                        alt="avatar"
                                    />
                                </div>
                            </div>
                        </label>

                    </div>

                    {/* DATOS */}
                    <div className="w-full flex flex-col flex-1 gap-8">

                        <div className="w-full mx-auto flex flex-col gap-6">

                            <div className="w-full flex flex-row gap-4 items-baseline">
                                <p className="font-bold text-[1.1rem]">@{session?.user.name}</p>
                                <p className="text-[0.8rem] text-[var(--gris2)] font-bold">(No puedes cambiar tu nombre de usuario)</p>
                            </div>

                            <div className="w-full">
                                <Input
                                    tipo="text"
                                    id="nombre_real"
                                    placeholder={session?.user.nombre_real}
                                    value={formData.nombre_real}
                                    onChange={handleChange}
                                    required={false}
                                />
                            </div>

                            <div className="w-full">
                                <label className="block mb-2">Descripción del perfil</label>
                                <Input
                                    tipo="textarea"
                                    id="descripcion_perfil"
                                    value={formData.descripcion_perfil}
                                    rows={4}
                                    onChange={handleChange}
                                    required={false}
                                />
                            </div>

                        </div>

                        {/* SPICES */}

                        <div className="w-full flex flex-col gap-6">
                            <div className="w-full flex flex-wrap gap-2">
                                {formData.spices_seguidos.map((spice: string, index: number) => (
                                    <Tag
                                        key={index}
                                        nombre={spice}
                                        tamano="pequeno"
                                        isActive
                                        icon
                                        mode="toggle"
                                        onClick={() => handleToggleSpice(spice)}
                                    />
                                ))}
                            </div>

                            {showSpices ?
                                <p className="font-bold text-[0.9rem] text-[var(--gris2)]">Haz click en los Spices para añadirlos:</p>
                                : <p onClick={handleMostrarSpices} className="font-bold text-[0.9rem] text-[var(--gris2)] underline cursor-pointer">
                                    {session?.user.userType === "expert" ? "Editar tus Especialidades" : "Editar tus Spices"}
                                </p>
                            }

                            <div className="w-full flex flex-wrap gap-2">
                                {showSpices &&
                                    listaSpices.map((spice, index) => (
                                        <Tag
                                            key={index}
                                            nombre={spice}
                                            tamano="pequeno"
                                            isActive={formData.spices_seguidos.includes(spice)}
                                            mode="toggle"
                                            onClick={() => handleToggleSpice(spice)}
                                        />
                                    ))
                                }
                            </div>

                        </div>

                        {/* BOTÓN SUBMIT */}
                        <div className="w-full flex justify-end gap-4">
                            <BotonSubmit texto="Guardar cambios" />
                        </div>

                    </div>

                </form>

            </section>

            {/* SECCIÓN 'MODIFICA TUS DATOS DE ACCESO' */}

            <section className="w-full mx-auto flex flex-col border-b border-b-1 border-b-[var(--gris3)] py-16 px-col1 gap-12">

                <h3>Modifica tus datos de acceso</h3>

                <div className="w-full flex flex-row gap-8">

                    <div className="w-col1"></div>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col flex-1 gap-8">

                        <div className="w-full">
                            <label className="block mb-2">Nuevo Email</label>
                            <Input
                                tipo="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required={false}
                            />
                        </div>

                        <div className="w-full">
                            <label className="block mb-2">Nueva Contraseña</label>
                            <Input
                                tipo="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required={false}
                            />
                        </div>

                        <div className="w-full flex justify-end gap-4">
                            <BotonSubmit texto="Guardar cambios" />
                        </div>
                    </form>

                </div>

            </section>

            {/* SECCIÓN 'SALIR DE SPICED' */}

            <section className="w-full mx-auto flex flex-col py-16 px-col1 gap-12">

                <h3>Salir de Spiced</h3>

                <div className="w-col6 flex flex-row justify-start gap-4">
                    <Boton texto="Desconectarse" onClick={handleLogout} tamano="pequeno" jerarquia="primario" />
                    <Boton texto="Eliminar tu cuenta de Spiced (esta acción es irreversible)" onClick={() => setShowModal(true)} tamano="pequeno" jerarquia="secundario" />
                </div>

            </section>

        </div>

    );
}
