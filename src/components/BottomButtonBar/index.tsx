import Button from '../../ui-kit/Button/Button';

import './BottomButtonBar.scss';

export default function BottomButtonBar(props: { disabled: boolean; onClick: () => void }) {
  return (
    <section className="bottom-button-bar-section">
      <div className="bottom-button-bar-wrap">
        <div className="bottom-button-bar-box">
          <div className="btn-box">
            <Button buttonVariant="secondary" {...props}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
