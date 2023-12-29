'use client';

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";
import { analytics } from "../firebase";
import { logEvent } from "firebase/analytics";



interface EmptyStateProps {
    title?: string;
    subtitle?: string; 
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title= 'No Listings Found',
    subtitle = "Try adjusting your search or filter to find what you're looking for.",
    showReset
}) => {

    const router = useRouter();
   

    return ( 
        <div className="
            h-[60vh]
            flex
            flex-col
            gap-2
            justify-center
            items-center

        ">
            <Heading 
                center
                title={title}
                subtitle={subtitle}
            />
            <div className="
                w-48
                mt-4

            ">
                {showReset && (
                    <Button 
                        outline
                        label="Reset Filters"
                        onClick={() => {
                            console.log('reset filters');
                            logEvent(analytics, 'reset_filters', {button: "reset"});
                            router.push('/')    
                        }}
                    />
                )}
            </div>
        </div>
     );
}
 
export default EmptyState;