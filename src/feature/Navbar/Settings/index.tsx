import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CogIcon } from "@heroicons/react/20/solid";
import { ActionType, UNIT_SYSTEM } from "src/context";
import { useAppContext } from "src/hooks";

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

export const Settings = () => {
  const {
    store: {
      settings: { units },
    },
    dispatch,
  } = useAppContext();
  const handleSettingChange = (unit: UNIT_SYSTEM) =>
    dispatch({
      type: ActionType.CHANGE_UNITS,
      payload: unit,
    });
  return (
    <div className="flex flex-row-reverse">
      <Menu as="div" className="relative inline-block text-left max-w-[60px]">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <CogIcon
              className="mr-1 h-5 w-5 text-gray-900 "
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <div
                    role="button"
                    onClick={() => handleSettingChange(UNIT_SYSTEM.METRIC)}
                    className={classNames(
                      active || units === UNIT_SYSTEM.METRIC
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Metric
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    role="button"
                    onClick={() => handleSettingChange(UNIT_SYSTEM.IMPERIAL)}
                    className={classNames(
                      active || units === UNIT_SYSTEM.IMPERIAL
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Imperial
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
