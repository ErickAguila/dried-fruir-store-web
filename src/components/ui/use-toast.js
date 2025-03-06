"use client"

import { useEffect, useState } from "react"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const toastTimeouts = new Map()

export const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
}

const toastReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      }

    case actionTypes.DISMISS_TOAST: {
      const { id } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastTimeouts.has(id)) {
        clearTimeout(toastTimeouts.get(id))
        toastTimeouts.delete(id)
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === id || id === "all"
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      }
    }
    case actionTypes.REMOVE_TOAST:
      if (action.id === "all") {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.id),
      }
    default:
      return state
  }
}

const useToastReducer = () => {
  const [state, setState] = useState({ toasts: [] })

  const dispatch = (action) => {
    setState((prevState) => toastReducer(prevState, action))
  }

  return [state, dispatch]
}

export function useToast() {
  const [state, dispatch] = useToastReducer()

  const toast = (props) => {
    const id = props.id || genId()
    const update = (props) => {
      dispatch({
        type: actionTypes.UPDATE_TOAST,
        toast: { ...props, id },
      })
    }
    const dismiss = () => {
      dispatch({ type: actionTypes.DISMISS_TOAST, id })
    }

    dispatch({
      type: actionTypes.ADD_TOAST,
      toast: {
        ...props,
        id,
        open: true,
        onOpenChange: (open) => {
          if (!open) dismiss()
        },
      },
    })

    // Auto-dismiss toast after delay
    if (props.duration !== Number.POSITIVE_INFINITY) {
      const timeout = setTimeout(() => {
        dismiss()
      }, props.duration || TOAST_REMOVE_DELAY)
      toastTimeouts.set(id, timeout)
    }

    return {
      id,
      dismiss,
      update,
    }
  }

  useEffect(() => {
    const handleRemoveToast = (e) => {
      if (e.key === "Escape") {
        dispatch({ type: actionTypes.DISMISS_TOAST, id: "all" })
      }
    }

    document.addEventListener("keydown", handleRemoveToast)
    return () => {
      document.removeEventListener("keydown", handleRemoveToast)
    }
  }, [dispatch])

  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: actionTypes.DISMISS_TOAST, id: toastId }),
  }
}

