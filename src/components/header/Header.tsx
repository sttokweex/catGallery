import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background: #fff;
  padding: 24px 0;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  margin-bottom: 32px;
`;

const Title = styled.h1`
  margin: 0;
  color: #222;
  font-size: 2rem;
`;

const Controls = styled.div`
  margin-top: 18px;
  display: flex;
  justify-content: center;
  gap: 32px;
`;

interface HeaderProps {
  autoUpdate: boolean;
  setAutoUpdate: (value: boolean) => void;
}

export default function Header({ autoUpdate, setAutoUpdate }: HeaderProps) {
  return (
    <HeaderWrapper>
      <Title>Cat Gallery</Title>
      <Controls>
        <label>
          <input
            type="checkbox"
            checked={autoUpdate}
            onChange={() => setAutoUpdate(true)}
          />
          Автоматическое обновление
        </label>
        <label>
          <input
            type="checkbox"
            checked={!autoUpdate}
            onChange={() => setAutoUpdate(false)}
          />
          Ручное обновление
        </label>
      </Controls>
    </HeaderWrapper>
  );
}
