import Options from "@/components/inputs/Options";

export default function PanelExperto() {
    return (
        <div className="w-full p-[30px]">

            <h1 className="">
                Recursos
            </h1>

            <div className="p-5">
                <Options
                    tipo="dropdown"
                    label="Ejemplo de dropdown"
                    name="dropdown"
                    opciones={[
                        { id: "Opcion1", texto: "Opción 1" },
                        { id: "Opcion2", texto: "Opción 2" },
                        { id: "Opcion3", texto: "Opción 3" },
                    ]}
                />
            </div>

            <div className="p-5">
                <Options
                    tipo="checkbox"
                    label="Ejemplo de grupo de checkboxes"
                    opciones={[
                        { id: "Opcion1", texto: "Opción 1" },
                        { id: "Opcion2", texto: "Opción 2" },
                        { id: "Opcion3", texto: "Opción 3" },
                    ]}
                />
            </div>

            <div className="p-5">
                <Options
                    tipo="radio"
                    label="Ejemplo de grupo de radios"
                    name="grupo-radios-1"
                    opciones={[
                        { id: "Opcion1", texto: "Opción 1" },
                        { id: "Opcion2", texto: "Opción 2" },
                        { id: "Opcion3", texto: "Opción 3" },
                    ]}
                />
            </div>

        </div>
    );
}
