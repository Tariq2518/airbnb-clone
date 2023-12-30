import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback , useMemo} from "react";
import toast from "react-hot-toast";

import { SafeUser } from "../types";
import useLoginModel from "./useLoginModal";

interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({ 
     listingId,
     currentUser 
    }: IUseFavorite) => {
        const router = useRouter();
        const useLoginModal = useLoginModel();

        const hasFavorite = useMemo(() => {
            const list = currentUser?.favouriteId || [];
            return list.includes(listingId);
        }, [currentUser, listingId]);

        const toggleFavorite = useCallback(async (
            e: React.MouseEvent<HTMLDivElement>
        ) => {
            e.stopPropagation();

            if(!currentUser){
                return useLoginModal.onOpen(); 
            }

            try {
                let request;
                if(hasFavorite){
                    request = () => axios.delete(`/api/favourites/${listingId}`);
                } else {
                    request = () => axios.post(`/api/favourites/${listingId}`);
                }

                await request();

                router.refresh();
                toast.success("Success");

            } catch (error) {
                toast.error("Something went wrong");
            }

        }, [
            currentUser,
            hasFavorite,
            listingId,
            router,
            useLoginModal
        ]);

        return {
            hasFavorite, 
            toggleFavorite
        }
}

export default useFavorite;
