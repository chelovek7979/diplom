import { useState, useEffect } from "react";

import Tab from "./Tab/Tab"
import '../Tab-section/Tabs_style.scss'

    export default function Tab_section({ setCategory, category }){
    
    const tabs = [
        { label: 'Четырехклапанные', value: 'fourclan' },
        { label: 'Для почты', value: 'mail' },
        { label: 'Большие', value: 'big' },
        { label: 'Обувные', value: 'shoe ' },
        { label: 'Архивные', value: 'archive' },
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