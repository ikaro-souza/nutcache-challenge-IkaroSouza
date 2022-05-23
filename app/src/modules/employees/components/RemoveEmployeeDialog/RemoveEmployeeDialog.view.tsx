import { Button } from 'modules/common'
import React from 'react'

interface RemoveEmployeeDialogViewProps {
  error?: string
  loading: boolean
  open: boolean
  onClose: VoidFunction
  onRemoveClick: VoidFunction
}

export const RemoveEmployeeDialogView: React.FC<
  RemoveEmployeeDialogViewProps
> = ({ error, loading, open, onClose, onRemoveClick }) => {
  return (
    <>
      {open && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-xs">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="p-4 rounded-t md:px-8">
                  <h6 className="font-semibold text-base text-center">
                    Remove Employee
                  </h6>
                </div>
                {/*body*/}
                <div className="flex-auto relative p-4 md:px-8">
                  <p className="text-center text-sm">
                    Attention! This action is irreversible, are you sure about
                    it?
                  </p>
                </div>
                {(error || loading) && (
                  <div className="border-t p-4">
                    <p
                      className={`font-medium text-center ${
                        loading ? '' : 'text-red-500'
                      } text-sm`}
                    >
                      {loading ? 'Please wait...' : error}
                    </p>
                  </div>
                )}
                {/*footer*/}
                <div className="border-t flex flex-col items-stretch p-4 md:px-8">
                  <Button
                    className="bg-transparent text-base text-black disabled:text-gray-400"
                    disabled={loading}
                    type="button"
                    onClick={() => onClose()}
                  >
                    Close
                  </Button>
                  <Button
                    className="bg-transparent font-semibold text-base text-red-500 disabled:text-gray-400"
                    disabled={loading}
                    onClick={onRemoveClick}
                  >
                    Remove employee
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="opacity-25 fixed inset-0 z-40 bg-black"
            onClick={() => onClose()}
          ></div>
        </>
      )}
    </>
  )
}
