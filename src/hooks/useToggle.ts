import {useCallback, useState} from "react";

const useToggle = (initialState: boolean) => {
    const [isToggled, setIsToggled] = useState(initialState);
    const toggle = useCallback(() => setIsToggled(!isToggled), [isToggled])
    return [isToggled,toggle]
}
export default useToggle;