import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

const ListboxSelect = ({listOptions, buttonClasses}) => {
  const [selected, setSelected] = useState(listOptions[0])

  return (
    <div className="">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className={`relative w-full text-left ${buttonClasses}`}>
            <span className="block truncate">{selected.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-4 h-4 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="border border-secondary z-20 absolute w-full py-1 mt-1 overflow-auto text-base bg-primary rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {listOptions.map((option, optionIndex) => (
                <Listbox.Option
                  key={optionIndex}
                  className={({ active }) =>
                    `${active ? 'text-white bg-secondary text-xs' : 'text-white text-opacity-70'}
                          cursor-pointer select-none relative py-2 pl-10 pr-4 transition duration-200 text-xs`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {option.name}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? 'text-amber-600' : 'text-amber-600'
                          }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default ListboxSelect

