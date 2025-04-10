import { Metadata } from "next";
import Options from "@/components/inputs/Options";
import NubeTags from "@/components/buttons/NubeTags";

export const metadata: Metadata = {
    title: 'Recursos',
};

export default function PanelExperto() {
    return (
        <div className="w-full p-[30px]">

            <h1 className="">
                Recursos
            </h1>

            <div className="p-5">
                <NubeTags />
            </div>

        </div>
    );
}
