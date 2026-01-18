import { useState, useCallback } from "react";

import { TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { RussianRuble, Users } from "lucide-react";
import { Plus, Edit, Trash, Loader } from "lucide-react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

import { useToast } from "@/hooks/use-toast";

import { IUserPost, IUserGet, IUserUpdate, TRole, TIsActivate } from "@/types/user";
import { UserService } from "@/services/User/UserService";

export const ManagerUser = () => {
    const { toast } = useToast();

    const [is_new_user, set_is_new_user] = useState<boolean>(true);

    const [get_user, set_get_user] = useState<IUserGet[]>([]);

    const [post_user, set_post_user] = useState<IUserPost>({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "USER",
    });

    const [update_user, set_update_user] = useState<IUserUpdate>({
        id_user: "",
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "0",
        is_active: "0"
    });

    const [filter, set_filter] = useState<IUserPost>({
        name: "",
        email: "",
        phone: "",
        role: "0",
    });

    const getUser = useCallback(() => {
        toast({
            title: "Buscando usuário"
        });

        UserService.get(filter)
            .then((result) => {
                if (!result.length) {
                    toast({
                        title: "Nem um usuário encontrado..."
                    });

                    set_get_user([]);
                };

                set_get_user(result);
            })
            .catch((error) => {
                toast({
                    title: "Erro",
                    description: error.message
                });
            });
    }, [filter]);

    const postUser = useCallback(() => {
        UserService.create(post_user)
            .then((result) => {
                toast({
                    title: result.message
                });
            })
            .catch((error) => {
                toast({
                    title: "Erro ao cadastrar usuário",
                    description: error.message
                });
            });
    }, [post_user]);

    const updateUser = useCallback(() => {
        UserService.updateById(update_user)
            .then((result) => {
                toast({
                    title: result.message
                });

                set_is_new_user(true);
                set_post_user({
                    name: "",
                    email: "",
                    password: "",
                    phone: "",
                    role: "USER",
                });
                getUser();
            })
            .catch((error) => {
                toast({
                    title: "Erro ao cadastrar usuário",
                    description: error.message
                });
            });
    }, [update_user]);

    const deleteUser = useCallback((id_user) => {
        UserService.deleteById({ id_user: id_user })
            .then((result) => {
                toast({
                    title: result.message
                });

                getUser();
            })
            .catch((error) => {
                toast({
                    title: "Erro ao cadastrar usuário",
                    description: error.message
                });
            });
    }, []);

    return (
        <TabsContent value="users">
            {/* Cadastrar/Atualizar usuário */}
            <div>
                <Card className="p-8 shadow-lg" id="manager_user">
                    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                        <Users className="mr-2 w-6 h-6 text-primary" />
                        Gerenciar Usuários
                    </h2>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <Input
                                placeholder="Digite o nome do usuário"
                                value={is_new_user ? post_user.name : update_user.name}
                                onChange={(e) => is_new_user ?
                                    set_post_user((prev) => ({
                                        ...prev,
                                        name: e.target.value
                                    }))
                                    :
                                    set_update_user((prev) => ({
                                        ...prev,
                                        name: e.target.value
                                    }))
                                }
                            />
                        </div>

                        <div className="space-y-4">
                            <Input
                                placeholder="Digite o e-mail"
                                value={is_new_user ? post_user.email : update_user.email}
                                onChange={(e) => is_new_user ?
                                    set_post_user((prev) => ({
                                        ...prev,
                                        email: e.target.value
                                    }))
                                    :
                                    set_update_user((prev) => ({
                                        ...prev,
                                        email: e.target.value
                                    }))
                                }
                            />
                        </div>

                        <div className="space-y-4">
                            <Input
                                placeholder="Digite o número de telefone"
                                value={is_new_user ? post_user.phone : update_user.phone}
                                onChange={(e) => is_new_user ?
                                    set_post_user((prev) => ({
                                        ...prev,
                                        phone: e.target.value
                                    }))
                                    :
                                    set_update_user((prev) => ({
                                        ...prev,
                                        phone: e.target.value
                                    }))
                                }
                            />
                        </div>

                        <div className="space-y-4">
                            <Input
                                placeholder="Digite a senha"
                                value={is_new_user ? post_user.password : update_user.password}
                                onChange={(e) => is_new_user ?
                                    set_post_user((prev) => ({
                                        ...prev,
                                        password: e.target.value
                                    }))
                                    :
                                    set_update_user((prev) => ({
                                        ...prev,
                                        password: e.target.value
                                    }))
                                }
                            />
                        </div>

                        <div>
                            <Select
                                value={is_new_user ? post_user.role : update_user.role}
                                onValueChange={(e) => is_new_user ?
                                    set_post_user((prev) => ({
                                        ...prev,
                                        role: e as TRole
                                    }))
                                    :
                                    set_update_user((prev) => ({
                                        ...prev,
                                        role: e as TRole
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o nível de acesso" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                                    <SelectItem value="USER">USUÁRIO</SelectItem>
                                    <SelectItem value="TEMP_USER">USUÁRIO TEMPOÁRIO</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {!is_new_user && (
                            <div>
                                <Select
                                    value={is_new_user ? post_user.is_active : update_user.is_active}
                                    onValueChange={(e) => is_new_user ?
                                        set_post_user((prev) => ({
                                            ...prev,
                                            is_active: e as TIsActivate
                                        }))
                                        :
                                        set_update_user((prev) => ({
                                            ...prev,
                                            is_active: e as TIsActivate
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Status do usuário" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Ativo</SelectItem>
                                        <SelectItem value="0">Inativo</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        <Button className="w-full"
                            onClick={() => {
                                is_new_user ? postUser() : updateUser()
                            }}>
                            <Plus />
                            {is_new_user ? "Cadastrar usuário" : "Atualizar usuário"}
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Buscar usuário */}
            <div className="mt-12 pt-8 border-t flex flex-col gap-5">
                <Card className="relative p-8 shadow-lg flex flex-col gap-3">
                    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                        <Users className="mr-2 w-6 h-6 text-primary" />
                        Buscar usuários
                    </h2>

                    <div className="space-y-4">
                        <Input
                            placeholder="Digite o nome do usuário"
                            value={filter.name}
                            onChange={(e) => {
                                set_filter((prev) => ({
                                    ...prev,
                                    name: e.target.value
                                }));
                            }}
                        />
                    </div>

                    <div className="space-y-4">
                        <Input
                            placeholder="Digite o e-mail"
                            value={filter.email}
                            onChange={(e) => {
                                set_filter((prev) => ({
                                    ...prev,
                                    email: e.target.value
                                }));
                            }}
                        />
                    </div>

                    <div className="space-y-4">
                        <Input
                            placeholder="Digite o número de telefone"
                            value={filter.phone}
                            onChange={(e) => {
                                set_filter((prev) => ({
                                    ...prev,
                                    phone: e.target.value
                                }));
                            }}
                        />
                    </div>

                    <div>
                        <Select
                            value={filter.role}
                            onValueChange={(e) => {
                                set_filter((prev) => ({
                                    ...prev,
                                    role: e as TRole
                                }));
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione o nível de acesso" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">Nível de acesso</SelectItem>
                                <SelectItem value="ADMIN">ADMIN</SelectItem>
                                <SelectItem value="USER">USUÁRIO</SelectItem>
                                <SelectItem value="TEMP_USER">USUÁRIO TEMPOÁRIO</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button onClick={getUser}>
                        <Loader />
                        Buscar usuário
                    </Button>
                </Card>
            </div>

            {/* Usuário(s) retornado(s) */}
            {get_user?.map((user: IUserPost) => (
                <div className="mt-12 pt-8 border-t flex flex-col gap-5" key={user.id_user}>
                    <Card className="relative p-8 shadow-lg flex flex-col gap-3">
                        <div className="space-y-4">
                            <Label>Nome do usuário</Label>
                            <Input value={user.name} disabled />
                        </div>

                        <div className="space-y-4">
                            <Label>E-mail</Label>
                            <Input value={user.email} disabled />
                        </div>

                        <div className="space-y-4">
                            <Label>Telefone</Label>
                            <Input value={user.phone} disabled />
                        </div>

                        <div className="space-y-4">
                            <Label>Nível de acesso</Label>
                            <Input value={user.role} disabled />
                        </div>

                        <div className="space-y-4">
                            <Label>Status do usuário</Label>
                            <Input value={String(user.is_active) === "1" ? "Ativo" : "Inativo"} disabled />
                        </div>

                        <div className="flex gap-6">
                            <Button className="w-full bg-orange-500 hover:bg-orange-600"
                                onClick={() => {
                                    set_update_user({
                                        id_user: user.id_user,
                                        name: user.name,
                                        email: user.email,
                                        phone: user.phone,
                                        password: user.password,
                                        role: user.role,
                                        is_active: String(user.is_active) as TIsActivate
                                    });

                                    document.getElementById("manager_user")?.scrollIntoView({
                                        behavior: "smooth"
                                    });

                                    set_is_new_user(false);
                                }}
                            >
                                <Edit />
                                Editar
                            </Button>

                            <Button className="w-full bg-red-500 hover:bg-red-600"
                                onClick={() => deleteUser(user.id_user)}
                            >
                                <Trash />
                                Deletar
                            </Button>
                        </div>
                    </Card>
                </div>
            ))}
        </TabsContent>
    );
};