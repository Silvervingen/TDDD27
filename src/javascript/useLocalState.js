function useLocalState(defaultValue, key){
    const[value, setValue] = useState(()=>{
        return localStorage!=null
        ? JSON.parse(localStorage):defaultValue;});
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value));
    },[key,value]);
    return[value,setValue];
}
export{useLocalState}