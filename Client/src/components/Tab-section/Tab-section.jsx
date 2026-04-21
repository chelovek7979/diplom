import { useState, useEffect } from "react";

import Tab from "./Tab/Tab"
import '../Tab-section/Tabs_style.scss'

    export default function Tab_section({ setCategory, category }){
    
    const tabs = [
        { label: 'Электроника', value: 'electronics' },
        { label: 'Инструмент', value: 'tool' },
        { label: 'Кухня', value: 'kitchen_items' },
        { label: 'Спорт', value: 'sport' },
        { label: 'насадки', value: 'Snap-in' },
    ];

            return(
                <div className="Tab-section">
                    {tabs.map(tab => (
                        <Tab
                        key={tab.value}
                        text={tab.label}
                        value={tab.value}
                        isActive = {category === tab.value}
                        setCategory={setCategory}
                        />
                    ))}
                </div>
            )
        }