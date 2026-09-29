"use client";

import styled from "styled-components";

export type GalleryView = "photos" | "albums";

interface GalleryHeaderProps {
  view: GalleryView;
  onViewChange: (view: GalleryView) => void;
  onPrimaryClick: () => void;
}

export function GalleryHeader({
  view,
  onViewChange,
  onPrimaryClick,
}: GalleryHeaderProps) {
  const primaryLabel = view === "photos" ? "＋ Upload" : "＋ アルバム作成";

  return (
    <Header>
      <Left>
        <Title>{view === "photos" ? "画像一覧" : "アルバム一覧"}</Title>
        <Tabs>
          <Tab
            type="button"
            $active={view === "photos"}
            onClick={() => onViewChange("photos")}
          >
            写真
          </Tab>
          <Tab
            type="button"
            $active={view === "albums"}
            onClick={() => onViewChange("albums")}
          >
            アルバム
          </Tab>
        </Tabs>
      </Left>
      <PrimaryBtn type="button" onClick={onPrimaryClick}>
        {primaryLabel}
      </PrimaryBtn>
    </Header>
  );
}

const Header = styled.header`
  max-width: 1200px;
  margin: 0 auto 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  letter-spacing: 1px;
`;

const Tabs = styled.div`
  display: inline-flex;
  background: #161616;
  border-radius: 999px;
  padding: 4px;
  gap: 4px;
`;

const Tab = styled.button<{ $active: boolean }>`
  border: none;
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  color: ${(props) => (props.$active ? "#fff" : "#888")};
  background: ${(props) => (props.$active ? "#3b82f6" : "transparent")};

  &:hover {
    color: #fff;
  }
`;

const PrimaryBtn = styled.button`
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  padding: 0;

  &:hover {
    opacity: 0.8;
  }
`;
