// @flow
import React from 'react';
import styles from './SubscribeForm.module.scss';

type Props = {|
  +signupSource: string,
  +large: bool,
  +noDescription: bool,
  +noSpacing: bool,
  +onKeyDown: Function,
|};

const SubscribeForm = ({ signupSource, large, noDescription, noSpacing, onKeyDown }: Props) => (
  <div
    className={`${styles['container']} ${large ? styles['large'] : ''} ${
      noSpacing ? styles['no-spacing'] : ''
    }`}
  >
    {!noDescription && (
      <p className={styles['description']}>
        <b>Subscribe 🚀</b> There's more to it than just weekly newsletters.<br/> <b>Join</b> the club to find out 🤫
      </p>
    )}
    <form
      action={`https://gmail.us20.list-manage.com/subscribe/post?SIGNUP=${encodeURIComponent(
        signupSource,
      )}`}
      method="post"
      target="_blank"
    >
      <input type="hidden" name="u" value="227a302c7732f74313b18dcd7" />
      <input type="hidden" name="id" value="f92846f902" />
      <input
        type="email"
        autoCapitalize="off"
        autoCorrect="off"
        name="MERGE0"
        size="25"
        placeholder="terps@umd.edu"
        aria-label="Email Address"
        onKeyDown={onKeyDown}
      />
      <br />
      <input type="submit" name="submit" value="SUBSCRIBE" />
    </form>
  </div>
);

export default SubscribeForm;
