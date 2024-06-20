import MainLayout from "../layout/MainLayout"

const NotApproved = () => {
    return (
        <MainLayout>
            <div className='flex justify-center mt-[200px]'>
                <div className='flex justify-center flex-col items-center'>
                    <h1 className='text-[30px] font-bold text-slate-600 tracking-wider font-quicksand'>You are not approved yet</h1>
                    <h1 className='text-[18px] font-bold text-zinc-600 tracking-wider font-quicksand'>Please wait for admins' approval</h1>
                </div>
            </div>
        </MainLayout>
    )
}

export default NotApproved
