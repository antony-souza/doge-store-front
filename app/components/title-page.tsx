import React from "react";

interface ITitlePage{
    name: string
}

export const TitlePage: React.FC<ITitlePage> = ({ name }) => {
    return (
        <h2 className="text-start font-bold text-black text-3xl" >
            {name}
        </h2>
    )
};

// export default TitlePage;