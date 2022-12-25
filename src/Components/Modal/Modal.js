

export function Modal ({submiteUpdates, setActiveModal, activeModal, passwodModal, setPasswordModal}){
    return(
        <div className={activeModal ? 'modal active-modal' : 'modal'}>
            <p>Enter Your Password</p>
            <input value={passwodModal} onChange={(e) => setPasswordModal(e.target.value)} type="password" />
            <button onClick={(event) => {
                submiteUpdates(event)
                setActiveModal(false)
                }}>Log In</button>
        </div>
    )
}