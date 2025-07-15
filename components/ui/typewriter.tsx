"use client";

import TypewriterComponent from "typewriter-effect";

type TypewriterProps = {
    typeWriterText: string[];
};

export const Typewriter = ({typeWriterText}: TypewriterProps) => {
    return <TypewriterComponent
                options={{
                    strings: typeWriterText,
                    autoStart: true,
                    loop: true,
                    delay: 40,
                    deleteSpeed: 15,
                    wrapperClassName: "font-extrabold",
                    cursor: "",
                }}
            />
}