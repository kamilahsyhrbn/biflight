import React, { useState, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import airports from "../airports/airportsList";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function AirportInput({
  value,
  placeholder,
  onChange,
  className,
}) {
  const [query, setQuery] = useState("");
  const [selectedAirport, setSelectedAirport] = useState(null); // untuk menyimpan opsi yang dipilih

  useEffect(() => {
    const selected = airports.find((airport) => airport.iata_code === value);
    setSelectedAirport(selected || null);
    setQuery(
      selected
        ? `${selected.city} - ${selected.name} (${selected.iata_code})`
        : ""
    );
  }, [value]);

  const handleSelect = (airport) => {
    setSelectedAirport(airport); // Atur opsi yang dipilih ke state
    setQuery(
      airport ? `${airport.city} - ${airport.name} (${airport.iata_code})` : ""
    ); // Set nilai query untuk memperbarui input
    onChange(airport ? airport.iata_code : ""); // Kirim hanya kode ke parent component
  };

  // Filter items based on the query
  const filteredItems =
    query === ""
      ? airports
      : airports.filter((airport) =>
          airport.city.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <Combobox as="div" value={value} onChange={handleSelect}>
      <div className="relative mt-1">
        <Combobox.Input
          className={className}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder={placeholder}
        />

        {filteredItems.length > 0 && (
          <Combobox.Options
            className={`absolute z-[9999999999999] mt-1 max-h-60 w-72 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
          >
            {filteredItems.map((airport) => (
              <Combobox.Option
                key={airport.iata_code}
                value={airport}
                className={({ active }) =>
                  classNames(
                    "cursor-default select-none relative py-2 pl-3 pr-9",
                    active ? "text-white bg-[#2A629A]" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {airport.city} - {airport.name} ({airport.iata_code})
                    </span>
                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-[#2A629A]"
                        )}
                      ></span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
