'use client';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import { AiOutlineMenu } from 'react-icons/ai';
import { useCallback, useState } from 'react';
import useRegisterModal from '/app/hooks/useRegisterModal';
import useLoginModel from '/app/hooks/useLoginModal';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { SafeUser } from '/app/types';
import useRentModal from '/app/hooks/useRentModal';
import { logEvent } from 'firebase/analytics';
import { analytics } from '/app/firebase';

interface UserMenuProps {
    currentUser?: SafeUser| null;
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModel();
    const rentModal = useRentModal();

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = useCallback(() => {
        logEvent(analytics, 'menu_toggle', {button: "menu"});
        setIsOpen((value) => !value);
    }, []);

    const onRentProperty = useCallback(() => {
        if (!currentUser) {
           return loginModal.onOpen();
        }

        rentModal.onOpen();
        
    }, [currentUser, loginModal, rentModal]);

    return ( 
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={onRentProperty}
                className="
                hidden
                md:block
                text-sm
                font-semibold
                py-3
                px-4
                rounded-full
                hover:bg-neutral-100
                transition
                cursor-pointer">
                    Airbnb Your Home
                </div>
                <div onClick={toggleMenu}
                className="
                p-4
                md:py-1
                md:px-2
                border-[1px]
                border-neutral-200
                flex
                flex-row
                items-center
                gap-3
                rounded-full
                cursor-pointer
                hover:shadow-md
                transition
                ">
                    <AiOutlineMenu/>
                    <div className='hidden md:block'>
                        <Avatar src={currentUser?.image}/>
                    </div>

                </div>

            </div>
            {isOpen && (
                <div className='
                absolute
                rounded-xl
                shadow-md
                w-[40vw]
                md:w-3/4
                bg-white
                overflow-hidden
                right-0
                top-12
                text-sm'>
                    <div className='flex flex-col cursor-pointer '>
                        {currentUser ? (
                             <>
                             <MenuItem
                             onClick={() => {}}
                             label="My trips"/>
                             <MenuItem
                             onClick={() => {}}
                             label="Favourite"/>
                             <MenuItem
                             onClick={() => {}}
                             label="My Reservation"/>
                             <MenuItem
                             onClick={() => {}}
                             label="My Properties"/>
                             <MenuItem
                             onClick={() =>{
                                logEvent(analytics, 'rent_model_toggle', {button: "rent"});
                                rentModal.onOpen;
                             }
                                
                            }
                             label="Airbnb my Home"/>
                            <hr/>
                            <MenuItem
                             onClick={() => {signOut()}}
                             label="Log out "/>
                             </>

                        ):(
                            <>
                            <MenuItem
                            onClick={loginModal.onOpen}
                            label="Login"/>
                            <MenuItem
                            onClick={registerModal.onOpen}
                            label="Sign Up"/>
                            </>
                        )}

                       
                    </div>

                </div>

            )}

        </div>
     );
}
 
export default UserMenu;