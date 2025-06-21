export type CountdownProps = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;

}


export type NewsItemProps = {
    id: number;
    headline: string;
    date: string;
    summary: string;
    image: string;

}

export type FeaturedNewsProps = {
    item: NewsItemProps;
}

export type InternationOfficesProps = {
    id: number;
    country: string;
    flag: string;
    company: string;
    email: string;
}

export type NewsUpdatesProps = {
    id: number;
    title: string;
    news_date: string;
    image_url: string;
    content: string;
    is_published: boolean;
}

export type PlaylistProps = {
    id: number;
    title: string;
    image: string;
    article_url: string;
    watch_url: string;
}
export type TeamProps = {
    id: number;
    name: string;
    institution: string
}
export type TeamRankProps = {
    id: string,
    team: TeamProps;
    rank: number;
    points_earned: number;
    video_url_1: null;
    video_url_2: null;
    championship_id: number;
}

export type TestimonialsProps = {
    id: number;
    fullName: string;
    designation: string;
    role: string;
    summary: string;
    image: string
}

export type CompetitionProps = {
    id: number;
    competition: string;
    logo: string;
}

export type CompanyNameProps = {
    companyName: string
}

export type ChamionshipProps = {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
    location: string;
}

export type EventsProps = {
    id: number;
    name: string;
    slug: string;
    image_url:string;
    short_description: string;
    start_date: string;
    end_date: string;
    location: string;
    rules_and_eligibility: string,
    organized_by: string
    sponsored_by: string
    display_in_navigation: boolean;
    championship_id: number,
}

export type FooterProps = {
    address: string;
    email: string;
    phone: string;
    facebook_url: string;
    twitter_url: string;
    instagram_url: string;
    youtube_url: string;
    linkedin_url: string;
    about_text: string;
    created_at: string;
    updated_at: string;
}

// export type EventDetailsProps = {
//     id: number,
//     name: string;
//     championship: ChamionshipProps;
// }