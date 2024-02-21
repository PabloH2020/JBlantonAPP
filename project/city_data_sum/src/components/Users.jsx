import brianImg from '../assets/img_brian.jpg'
import danielleImg from '../assets/img_danielle.jpg'
import lisaImg from '../assets/img_lisa.jpg'

export const Users = ()=>{
    return(
        <div className="user-images">
                <img src={danielleImg} alt="Image of our client Danielle" className="profile-img"/>
                <img src={lisaImg} alt="Image of our client Lisa" className="profile-img"/>
                <img src={brianImg} alt="Image of our client Brian" className="profile-img"/>
            </div>
    )
}