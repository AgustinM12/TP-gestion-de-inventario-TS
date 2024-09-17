const Container = ({ list }) => {
    return (
        <>
            {
                list.length > 0 &&

                (<div className="rounded-md border-2 border-slate-300 w-full">
                    <ul>
                        {list.map((item, key) => (
                            <li className="border-y-2 border-slate-500 space-y-2" key={key}>{item.name}</li>
                        ))}
                    </ul>
                </div>)
            }
        </>
    )
}

export default Container
