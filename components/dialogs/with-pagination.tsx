import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper";
import React, {Children, ReactNode} from "react";

export default function PaginationContent({ title, label, children }: { title: string, label?: string, children: ReactNode }) {

    return (
        <div style={{ height: "100%", width: "100%", padding: 8, display: "grid", gridTemplateRows: "1fr 10fr" }}>
            <div>
                <h2 style={{ color: "var(--text)", marginBottom: 0 }}>{title}</h2>
                {label && <p style={{ color: "#bbb", fontSize: 11 }}>{label}</p>}
            </div>
            <Swiper
                modules={[ Pagination ]}
                spaceBetween={50}
                allowTouchMove={false}
                pagination={{ clickable: true, dynamicBullets: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                {Children.map(children, child => (
                    <SwiperSlide>
                        {child}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}