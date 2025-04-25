import { Loader } from "components/Loader";
import { ReposCardsSection } from "components/ReposCardsSection";
import { observer } from "mobx-react-lite";
import { AllReposStore } from "store/AllReposStore";
import { Meta } from "utils/meta";

export const ReposSection = observer(({ store }: { store: AllReposStore }) => {
  if (store.meta === Meta.loading) {
    return <Loader />;
  }

  if (store.meta === Meta.error) {
    return <div>Repozitories not found</div>;
  }

  return (
    <div>
      <ReposCardsSection repos={store.repos} />
    </div>
  );
});
