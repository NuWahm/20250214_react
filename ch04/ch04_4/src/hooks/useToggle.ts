import {useState, useCallback} from 'react'

// prettier-ignore
export const useToggle = function (initialCheckd: boolean = false): [boolean, () => void] {
  const [checked, setChecked] = useState<boolean>(initialCheckd)
  const toggleChecked = useCallback(() => setChecked(function (checked) {
      return !checked
    }), [])
  return [checked, toggleChecked]
}
