import Card from "components/Card";

import RepsService from "api/RepsService";
import ktsCat from "assets/images/kts-cat.png";
import { useFetching } from "hooks/useFetching.ts";
import { useEffect, useState } from "react";
import styles from "./RepsSection.module.scss";
import { Link } from "react-router";

const RepsSection = () => {
  const [reps, setReps] = useState<any[]>([]);
  const [fetchReps, error] = useFetching(async () => {
    const reps = await RepsService.getAll();
    setReps(reps);
  });

  useEffect(() => {
    fetchReps();
  }, []);

  return (
    <div className={styles.RepsSection}>
      {reps.map((repo) => (
        <Link className={styles.cardLink} to={`/repositories/${repo.name}`}>
          <Card image={ktsCat} title={repo.name} subtitle={repo.description}></Card>
        </Link>
      ))}
    </div>
  );
};

export default RepsSection;
