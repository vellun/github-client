import cn from "classnames";
import { Button } from "components/Button";
import { CheckBox } from "components/Checkbox";
import { Input } from "components/Input";
import { Text } from "components/Text";
import { useLocalObservable } from "mobx-react-lite";
import { useState } from "react";
import { RepoStore } from "store/RepoStore";
import styles from "./CreateRepoPage.module.scss";

export const CreateRepoPage: React.FC = () => {
  const [repoName, setRepoName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const repoStore = useLocalObservable(() => new RepoStore());

  console.log("SSSSSS", repoStore.repoMeta);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    repoStore.createRepo({
      name: repoName,
      description: description,
      private: isPrivate,
    });
  };

  return (
    <div className={cn("flex-container", styles.root)}>
      <div className={cn("flex-container", "form", styles.root__form)}>
        <Text className={styles.root__title} tag="h1" weight="bold" color="primary">
          Create a new repository
        </Text>
        <form onSubmit={handleSubmit}>
          <Input
            className={styles.root__field}
            placeholder="Enter repository name"
            value={repoName}
            onChange={(value) => setRepoName(value)}
          ></Input>
          <Input
            className={styles.root__field}
            placeholder="Enter repository description"
            value={description}
            onChange={(value) => setDescription(value)}
          ></Input>
          <div className={styles.root__private}>
            <CheckBox className={styles.root__field} checked={isPrivate} onChange={(value) => setIsPrivate(value)} />
            <div>
              <Text className="noMarginText">Private</Text>
              <Text className="noMarginText" view="p-14" color="secondary">
                You choose who can see and commit to this repository
              </Text>
            </div>
          </div>
          <Button type="submit">Create</Button>
        </form>
      </div>
    </div>
  );
};
