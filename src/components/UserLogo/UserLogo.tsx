import userLogo from "assets/icons/user-logo.svg";
import styles from "./UserLogo.module.scss"

type UserLogoProps = {
    src?: string,
    alt: string,
    width?: string,
    height?: string,
}

export const UserLogo = ({ src, alt, width, height }: UserLogoProps) => {
    const logo = src ? src : userLogo
    const w = width ? width : "32px"
    const h = height ? height : "32px"
    return (
        <img className={styles.avatar} src={logo} alt={alt} width={w} height={h} />
    );
};
