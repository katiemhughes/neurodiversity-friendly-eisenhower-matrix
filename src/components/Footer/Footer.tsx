import React from 'react';
import Icon from '@mdi/react';
import { mdiEmail } from '@mdi/js';
import { ReactComponent as Github } from '../../icons/Github.svg';

const MatrixForm: React.FC = () => (
  <footer className="footer" role="contentinfo">
    <p className="footer__portfolio">
      View my portfolio at{' '}
      <a
        className="footer__portfolio--link"
        href="https://www.katie-hughes.com/"
      >
        katie-hughes.com
      </a>
    </p>
    <div className="footer__icons">
      <a
        className="footer__link"
        href="https://github.com/katiemhughes/"
        target="_blank"
      >
        <Github />
      </a>
      <a
        className="footer__link"
        href="mailto:katie.m.hughes@hotmail.co.uk"
        target="_blank"
      >
        <Icon path={mdiEmail} size={1} />
      </a>
    </div>
  </footer>
);

export default MatrixForm;
