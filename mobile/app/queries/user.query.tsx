import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import User from "@/src/user/user.model";
import UserService from "@/src/user/user.service";

const service = new UserService();

export default function _useUserQuery() {
    const queryClient = useQueryClient();

    const userFindAll = useQuery({
        queryKey: ["users"],
        queryFn: () => service.findAll(),
    });

    const userFindById = (id: number) => {
        return useQuery({
            queryKey: ["userById", id],
            queryFn: () => service.finById(id),
            enabled: !!id,
        });
    }

    const createUser = useMutation({
        mutationFn: (data: User) => service.create(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["users"]});
        }
    });

    const updateUser = useMutation({
        mutationFn: ({data}: { data: User }) =>
            service.updateUser(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["userById", "users"]});
        }
    });

    const deleteUser = useMutation({
        mutationFn: (id: number) => service.delete(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["users"]});
        }
    });

    const resetPasswordRequest = useMutation({
        mutationFn: (email: string) => service.resetPasswordRequest(email),
    });

    return {
        userFindAll,
        userFindById,
        createUser,
        updateUser,
        deleteUser,
        resetPasswordRequest
    };
}
