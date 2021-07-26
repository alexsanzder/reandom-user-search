import React from "react";

type Person = any;

const App: React.FC = (): JSX.Element => {
    const [pesrsons, setPersons] = React.useState<Person[]>([]);
    const [inputValue, setInputValue] = React.useState<string>("");
    const [suggestions, setSuggestions] = React.useState<any[]>([""]);

    React.useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(
                "https://randomuser.me/api/?results=20"
            );
            const { results } = await response.json();
            // console.log(results);
            setPersons(results);
        };
        fetchUser();
    }, [setPersons]);

    const getFilteredRows = (rows: any[], filterKey: string) => {
        return rows.filter(
            (row) =>
                row?.name.first.toLowerCase().indexOf(filterKey.toLowerCase()) >
                -1
        );

        // return rows.filter((row: any) =>
        //     JSON.stringify(row.name.first)
        //         .toLowerCase()
        //         .includes(filterKey.toLowerCase())
        // );

        //Ben Awad
        // return rows.filter((row: any) => {
        //     console.log(Object.values(row));
        //     Object.values(row).some((str) =>
        //         ("" + str).toLowerCase().includes(filterKey.toLowerCase())
        //     );
        // });
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInputValue(value);
        const suggest = getFilteredRows(pesrsons, value);
        setSuggestions(suggest);
        value.length === 0 && setSuggestions([]);
    };

    const handleInputValue = (val: string) => {
        setInputValue(val);
        setSuggestions([]);
    };

    return (
        <div>
            <div className="grid justify-center grid-rows-[200px]">
                <input
                    className="w-80 focus:outline-none focus:ring-green-500 focus:ring-2 focus:ring-opacity-50 self-center h-12 pl-4 text-lg font-medium border-2 border-green-600 rounded-full"
                    placeholder="Quick search for anything..."
                    value={inputValue}
                    onChange={(e) => {
                        handleInputChange(e);
                    }}
                />
                <ul>
                    {suggestions &&
                        suggestions.map((suggestion: any, idx) => {
                            return (
                                <li
                                    className="hover:cursor-pointer text-gray-700"
                                    key={idx}
                                    onClick={() =>
                                        handleInputValue(
                                            suggestion?.name?.first
                                        )
                                    }
                                >
                                    {suggestion?.name?.first}
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
};

export default App;
