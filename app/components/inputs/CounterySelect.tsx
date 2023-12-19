'use client';

import Select from "react-select";
import useCountries from "/app/hooks/useCountries";

export type CounterySelectValue = {
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string;
}

interface CounterySelectProps {
    value?: CounterySelectValue;
    onChange: (value: CounterySelectValue) => void;
}


const CounterySelect : React.FC<CounterySelectProps> = ({
    value,
    onChange
}) => {

    const {getAll} = useCountries();

    console.log(getAll(),'here');

    return ( 
        <div>
            <Select 
                placeholder="Anywhere"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as CounterySelectValue)}
                formatOptionLabel={(option: any) => (
                    <div className="flex flex-row items-center gap-3 "> 
                        <div>{option.flag}</div>
                        <div>
                            {option.label}, 
                            <span className="text-neutral-800 ml-1 ">{option.region} </span>
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => 'p-3 border-2',
                    input : () => 'text-lg',
                    option: () => 'text-lg'
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: 'ffe4e6'
                        
                    }
                })}
            />
        </div>
     );
}
 
export default CounterySelect;