import React from 'react'

const AdminLeftSideBar = ({show,setShow,showData}) => {
  return (
    <div className='flex flex-col gap-2 max-w-[300px] w-[300px] py-3 min-h-screen'>
        {
            showData.map((s,i)=>(
                <button 
                onClick={()=>setShow(s.value)}
                className={` px-3 py-3 font-semibold text-base capitalize  text-start
                     ${show == s.value && ' bg-purple-100 text-slate-900 '}
                     hover:bg-violet-100 hover:text-slate-900
                     flex gap-2
                     `}
                key={i}>
                    <span className='text-2xl' dangerouslySetInnerHTML={{__html:s.icon}}/>

                    {s.title}
                </button>
            ))
        }
    </div>
  )
}

export default AdminLeftSideBar