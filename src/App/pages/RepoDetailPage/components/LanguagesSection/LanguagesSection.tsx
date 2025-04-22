import { Text } from "components/Text";
import { observer } from "mobx-react-lite";
import { RepoStore } from "store/RepoStore";
import styles from "./LanguagesSection.module.scss";
import { toJS } from "mobx";
import { colors } from "config/githubColors";

export const LanguagesSection: React.FC<{ store: RepoStore }> = observer(({ store }) => {
    let languages = {}
    if (store.languages) {
        languages = toJS(store.languages)
    }
    const totalBytes = Object.values(languages).reduce((acc, val) => acc + val, 0);

    return (
        <div className={styles.root}>
            <Text className={styles.root__title} view="p-18" weight="bold" color="primary">
                Languages
            </Text>
            <div className={styles["languages-scale"]}>
                {Object.entries(languages).map(([language, bytes]) => {
                    const percentage = (bytes / totalBytes) * 100;
                    const color = colors[language].color
                    return (
                        <div
                            key={language}
                            style={{ width: `${percentage}%`, backgroundColor: color, height: '100%' }}
                            title={`${language}: ${percentage.toFixed(2)}%`}
                        ></div>
                    );
                })}
            </div>
            <div className={styles.languages}>
                {Object.entries(languages).map(([language, bytes]) => {
                    const percentage = (bytes / totalBytes) * 100;
                    const color = colors[language].color
                    return (
                        <div className={styles.language}>
                            <div className={styles.languages__dot} style={{ backgroundColor: color }} />
                            <Text className="noMarginText">{`${language}: `}<Text tag="span" color="secondary">{percentage.toFixed(2)}%</Text></Text>
                        </div>
                    );
                })}
            </div>
        </div>
    );
})
