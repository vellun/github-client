
import { Loader } from "components/Loader";
import { ReposCardsSection } from "components/ReposCardsSection";
import { observer } from "mobx-react-lite";
import { AllReposStore } from "store/AllReposStore";
import { Meta } from "utils/meta";

export const ReposSection = observer(({ store }: { store: AllReposStore }) => {
  return (
    <div>
      {store.meta === Meta.loading && <Loader />}
      <ReposCardsSection repos={store.repos} />
    </div>
  );
});
